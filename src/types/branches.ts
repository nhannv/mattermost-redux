// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Dictionary} from './utilities';

export type BranchType = 'O' | 'I';

export type Branch = {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    name: string;
    description: string;
};

export type BranchesState = {
    currentBranchId: string;
    branches: Dictionary<Branch>;
    stats: any;
    totalCount: number;
};
