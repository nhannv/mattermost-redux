// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {combineReducers} from 'redux';
import {BranchTypes} from 'action_types';

import {GenericAction} from 'types/actions';
import {BranchesRequestsStatuses, RequestStatusType} from 'types/requests';

import {handleRequest, initialRequestState} from './helpers';

function getMyBranches(state: RequestStatusType = initialRequestState(), action: GenericAction): RequestStatusType {
    return handleRequest(
        BranchTypes.MY_BRANCHES_REQUEST,
        BranchTypes.MY_BRANCHES_SUCCESS,
        BranchTypes.MY_BRANCHES_FAILURE,
        state,
        action
    );
}

function getBranches(state: RequestStatusType = initialRequestState(), action: GenericAction): RequestStatusType {
    return handleRequest(
        BranchTypes.GET_BRANCHES_REQUEST,
        BranchTypes.GET_BRANCHES_SUCCESS,
        BranchTypes.GET_BRANCHES_FAILURE,
        state,
        action
    );
}

function joinBranch(state: RequestStatusType = initialRequestState(), action: GenericAction): RequestStatusType {
    return handleRequest(
        BranchTypes.JOIN_BRANCH_REQUEST,
        BranchTypes.JOIN_BRANCH_SUCCESS,
        BranchTypes.JOIN_BRANCH_FAILURE,
        state,
        action
    );
}

export default (combineReducers({
    getBranches,
    getMyBranches,
    joinBranch,
}) as (b: BranchesRequestsStatuses, a: GenericAction) => BranchesRequestsStatuses);
