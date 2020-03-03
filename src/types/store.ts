// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {AlertType} from './alerts';
import {GeneralState} from './general';
import {UsersState} from './users';
import {TeamsState} from './teams';
import {ChannelsState} from './channels';
import {PostsState} from './posts';
import {AdminState} from './admin';
import {JobsState} from './jobs';
import {SearchState} from './search';
import {IntegrationsState} from './integrations';
import {FilesState} from './files';
import {EmojisState} from './emojis';
import {SchemesState} from './schemes';
import {Typing} from './typing';
import {GroupsState} from './groups';
import {ChannelsRequestsStatuses, GeneralRequestsStatuses, PostsRequestsStatuses, TeamsRequestsStatuses, UsersRequestsStatuses, AdminRequestsStatuses, FilesRequestsStatuses, RolesRequestsStatuses, JobsRequestsStatuses, BranchesRequestsStatuses} from './requests';
import {Role} from './roles';
import {PreferenceType} from './preferences';
import {Bot} from './bots';
import {Dictionary} from './utilities';
import {BranchesState} from './branches';

export type GlobalState = {
    entities: {
        general: GeneralState;
        users: UsersState;
        teams: TeamsState;
        branches: BranchesState;
        channels: ChannelsState;
        posts: PostsState;
        bots: {
            accounts: Dictionary<Bot>;
        };
        preferences: {
            myPreferences: {
                [x: string]: PreferenceType;
            };
        };
        admin: AdminState;
        jobs: JobsState;
        alerts: {
            alertStack: Array<AlertType>;
        };
        search: SearchState;
        integrations: IntegrationsState;
        files: FilesState;
        emojis: EmojisState;
        typing: Typing;
        roles: {
            roles: {
                [x: string]: Role;
            };
            pending: Set<string>;
        };
        schemes: SchemesState;
        gifs: any;
        groups: GroupsState;
    };
    errors: Array<any>;
    requests: {
        channels: ChannelsRequestsStatuses;
        general: GeneralRequestsStatuses;
        posts: PostsRequestsStatuses;
        teams: TeamsRequestsStatuses;
        branches: BranchesRequestsStatuses;
        users: UsersRequestsStatuses;
        admin: AdminRequestsStatuses;
        files: FilesRequestsStatuses;
        roles: RolesRequestsStatuses;
        jobs: JobsRequestsStatuses;
    };
    websocket: {
        connected: boolean;
        lastConnectAt: number;
        lastDisconnectAt: number;
    };
};
