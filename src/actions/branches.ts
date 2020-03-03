// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {Client4} from 'client';
import {General} from '../constants';
import {BranchTypes} from 'action_types';

import {GetStateFunc, DispatchFunc, ActionFunc, batchActions, Action} from 'types/actions';

import {Branch} from 'types/branches';

import {logError} from './errors';
import {bindClientFunc, forceLogoutIfNecessary} from './helpers';

export function selectBranch(branch: Branch): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        dispatch({
            type: BranchTypes.SELECT_BRANCH,
            data: branch.id,
        }, getState);

        return {data: true};
    };
}

export function getBranch(branchId: string): ActionFunc {
    return bindClientFunc({
        clientFunc: Client4.getBranch,
        onSuccess: BranchTypes.RECEIVED_BRANCH,
        params: [
            branchId,
        ],
    });
}

export function getBranches(page = 0, perPage: number = General.BRANCHES_CHUNK_SIZE, includeTotalCount = false): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        let data;

        dispatch({type: BranchTypes.GET_BRANCHES_REQUEST, data}, getState);

        try {
            data = await Client4.getBranches(page, perPage, includeTotalCount);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);
            dispatch({type: BranchTypes.GET_BRANCHES_FAILURE, data}, getState);
            dispatch(logError(error));
            return {error};
        }

        const actions: Action[] = [
            {
                type: BranchTypes.RECEIVED_BRANCHES_LIST,
                data: includeTotalCount ? data.branches : data,
            },
            {
                type: BranchTypes.GET_BRANCHES_SUCCESS,
                data,
            },
        ];

        if (includeTotalCount) {
            actions.push({
                type: BranchTypes.RECEIVED_TOTAL_BRANCH_COUNT,
                data: data.total_count,
            });
        }

        dispatch(batchActions(actions), getState);

        return {data};
    };
}

export function createBranch(branch: Branch): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        let created;
        try {
            created = await Client4.createBranch(branch);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);
            dispatch(logError(error));
            return {error};
        }

        const member = {
            branch_id: created.id,
            user_id: getState().entities.users.currentUserId,
            //roles: `${General.BRANCH_ADMIN_ROLE} ${General.BRANCH_USER_ROLE}`,
            delete_at: 0,
            msg_count: 0,
            mention_count: 0,
        };

        dispatch(batchActions([
            {
                type: BranchTypes.CREATED_BRANCH,
                data: created,
            },
            {
                type: BranchTypes.RECEIVED_MY_BRANCH_MEMBER,
                data: member,
            },
            {
                type: BranchTypes.SELECT_BRANCH,
                data: created.id,
            },
        ]), getState);

        return {data: created};
    };
}

export function updateBranch(branch: Branch): ActionFunc {
    return bindClientFunc({
        clientFunc: Client4.updateBranch,
        onSuccess: BranchTypes.UPDATED_BRANCH,
        params: [
            branch,
        ],
    });
}

export function patchBranch(branch: Branch): ActionFunc {
    return bindClientFunc({
        clientFunc: Client4.patchBranch,
        onSuccess: BranchTypes.PATCHED_BRANCH,
        params: [
            branch,
        ],
    });
}
