// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import * as reselect from 'reselect';
import {Permissions} from '../../constants';
import {getConfig, getCurrentUrl} from 'selectors/entities/general';
import {Branch} from 'types/branches';
import {IDMappedObjects} from 'types/utilities';
import {GlobalState} from 'types/store';

export function getCurrentBranchId(state: GlobalState) {
    return state.entities.branches.currentBranchId;
}

export const getBranchByName = reselect.createSelector(getBranches, (state: GlobalState, name: string) => name, (branches: IDMappedObjects<Branch>, name: string): Branch|undefined => {
    return Object.values(branches).find((branch: Branch) => branch.name === name);
});
export function getBranches(state: GlobalState): IDMappedObjects<Branch> {
    return state.entities.branches.branches;
}

export function getBranchStats(state: GlobalState) {
    return state.entities.branches.stats;
}

export const getBranchesList = reselect.createSelector(
    getBranches,
    (branches) => {
        return Object.values(branches);
    }
);

export const getCurrentBranch = reselect.createSelector(
    getBranches,
    getCurrentBranchId,
    (branches, currentBranchId) => {
        return branches[currentBranchId];
    }
);

export function getBranch(state: GlobalState, id: string): Branch {
    const branches = getBranches(state);
    return branches[id];
}

export const getCurrentBranchUrl = reselect.createSelector(
    getCurrentUrl,
    getCurrentBranch,
    (state) => getConfig(state).SiteURL,
    (currentURL, currentBranch, siteURL) => {
        const rootURL = `${currentURL || siteURL}`;
        if (!currentBranch) {
            return rootURL;
        }

        return `${rootURL}/${currentBranch.name}`;
    }
);

export const getCurrentRelativeBranchUrl = reselect.createSelector(
    getCurrentBranch,
    (currentBranch) => {
        if (!currentBranch) {
            return '/';
        }
        return `/${currentBranch.name}`;
    }
);

export const getCurrentBranchStats = reselect.createSelector(
    getCurrentBranchId,
    getBranchStats,
    (currentBranchId, branchStats) => {
        return branchStats[currentBranchId];
    }
);
