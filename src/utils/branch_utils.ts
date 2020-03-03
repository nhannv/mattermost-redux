// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {Branch} from 'types/branches';
import {IDMappedObjects, Dictionary} from 'types/utilities';
import {General} from '../constants';

export function branchListToMap(branchList: Array<Branch>): IDMappedObjects<Branch> {
    const branches: Dictionary<Branch> = {};
    for (let i = 0; i < branchList.length; i++) {
        branches[branchList[i].id] = branchList[i];
    }
    return branches;
}

export function sortBranchsWithLocale(locale: string): (a: Branch, b: Branch) => number {
    return (a: Branch, b: Branch): number => {
        if (a.name !== b.name) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale || General.DEFAULT_LOCALE, {numeric: true});
        }

        return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale || General.DEFAULT_LOCALE, {numeric: true});
    };
}
