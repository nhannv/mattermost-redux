// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {combineReducers} from 'redux';
import {BranchTypes, UserTypes} from 'action_types';
import {branchListToMap} from 'utils/branch_utils';
import {Branch} from 'types/branches';
import {RelationOneToOne, IDMappedObjects} from 'types/utilities';
import {GenericAction} from 'types/actions';

function currentBranchId(state = '', action: GenericAction) {
    switch (action.type) {
    case BranchTypes.SELECT_BRANCH:
        return action.data;

    case UserTypes.LOGOUT_SUCCESS:
        return '';
    default:
        return state;
    }
}

function branches(state: IDMappedObjects<Branch> = {}, action: GenericAction) {
    switch (action.type) {
    case BranchTypes.RECEIVED_BRANCHES_LIST:
    case UserTypes.LOGIN: // Used by the mobile app
        return Object.assign({}, state, branchListToMap(action.data.branches));
    case BranchTypes.RECEIVED_BRANCHES:
        return Object.assign({}, state, action.data);

    case BranchTypes.CREATED_BRANCH:
    case BranchTypes.UPDATED_BRANCH:
    case BranchTypes.PATCHED_BRANCH:
    case BranchTypes.RECEIVED_BRANCH:
        return {
            ...state,
            [action.data.id]: action.data,
        };

    case BranchTypes.RECEIVED_BRANCH_DELETED: {
        const nextState = {...state};
        const branchId = action.data.id;
        if (nextState.hasOwnProperty(branchId)) {
            Reflect.deleteProperty(nextState, branchId);
            return nextState;
        }

        return state;
    }

    case BranchTypes.UPDATED_BRANCH_SCHEME: {
        const {branchId, schemeId} = action.data;
        const branch = state[branchId];

        if (!branch) {
            return state;
        }

        return {...state, [branchId]: {...branch, scheme_id: schemeId}};
    }

    case UserTypes.LOGOUT_SUCCESS:
        return {};

    default:
        return state;
    }
}


/*function classesInBranch(state: RelationOneToOne<Branch, RelationOneToOne<UserProfile, BranchMembership>> = {}, action: GenericAction) {
    switch (action.type) {
    case BranchTypes.RECEIVED_CLASS_IN_BRANCH: {
        const data = action.data;
        const classes = {...(state[data.branch_id] || {})};
        classes[data.user_id] = data;
        return {
            ...state,
            [data.branch_id]: classes,
        };
    }
    case BranchTypes.RECEIVED_TEAM_CLASSES: {
        const data = action.data;
        if (data && data.length) {
            const nextState = {...state};
            for (const class of data) {
                if (nextState[class.branch_id]) {
                    nextState[class.branch_id] = {...nextState[class.branch_id]};
                } else {
                    nextState[class.branch_id] = {};
                }
                nextState[class.branch_id][class.user_id] = class;
            }

            return nextState;
        }

        return state;
    }
    case BranchTypes.RECEIVED_CLASSES_IN_BRANCH: {
        const data = action.data;
        if (data && data.length) {
            const branchId = data[0].branch_id;
            const classes = {...(state[branchId] || {})};
            for (const class of data) {
                classes[class.user_id] = class;
            }

            return {
                ...state,
                [branchId]: classes,
            };
        }

        return state;
    }
    case BranchTypes.REMOVE_CLASS_FROM_BRANCH: {
        const data = action.data;
        const classes = state[data.branch_id];
        if (classes) {
            const nextState = {...classes};
            Reflect.deleteProperty(nextState, data.user_id);
            return {
                ...state,
                [data.branch_id]: nextState,
            };
        }

        return state;
    }
    case BranchTypes.RECEIVED_BRANCH_DELETED: {
        const nextState = {...state};
        const branchId = action.data.id;
        if (nextState.hasOwnProperty(branchId)) {
            Reflect.deleteProperty(nextState, branchId);
            return nextState;
        }

        return state;
    }
    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}*/

function stats(state: any = {}, action: GenericAction) {
    switch (action.type) {
    case BranchTypes.RECEIVED_BRANCH_STATS: {
        const stat = action.data;
        return {
            ...state,
            [stat.branch_id]: stat,
        };
    }
    case BranchTypes.RECEIVED_BRANCH_DELETED: {
        const nextState = {...state};
        const branchId = action.data.id;
        if (nextState.hasOwnProperty(branchId)) {
            Reflect.deleteProperty(nextState, branchId);
            return nextState;
        }

        return state;
    }
    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

function totalCount(state = 0, action: GenericAction) {
    switch (action.type) {
    case BranchTypes.RECEIVED_TOTAL_BRANCH_COUNT: {
        return action.data;
    }
    default:
        return state;
    }
}

export default combineReducers({

    // the current selected branch
    currentBranchId,

    // object where every key is the branch id and has and object with the branch detail
    branches,
    
    stats,

    totalCount,
});
