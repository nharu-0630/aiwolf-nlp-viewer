export interface GameData {
    agents: Agent[]
    entries: Entry[]
    game_id: string
    win_side: string
}

export interface Agent {
    idx: number
    name: string
    role: string
    team: string
}

export interface Entry {
    agent: string
    request: Request
    request_timestamp: number
    response_timestamp: number
    response?: string
}

export interface Request {
    request: string
    info?: Info
    setting?: Setting
}

export interface Info {
    statusMap: Record<string, string>
    roleMap: Record<string, string | undefined>
    remainTalkMap: Record<string, number | undefined>
    remainWhisperMap: Record<string, number | undefined>
    day: number
    agent: string
    executedAgent?: string
    divineResult?: DivineResult
}

export interface DivineResult {
    day: number
    agent: string
    target: string
    result: string
}

export interface Setting {
    roleNumMap: RoleNumMap
    maxTalk: number
    maxTalkTurn: number
    maxWhisper: number
    maxWhisperTurn: number
    maxSkip: number
    isEnableNoAttack: boolean
    isVoteVisible: boolean
    isTalkOnFirstDay: boolean
    responseTimeout: number
    actionTimeout: number
    maxRevote: number
    maxAttackRevote: number
}

export interface RoleNumMap {
    BODYGUARD: number
    MEDIUM: number
    POSSESSED: number
    SEER: number
    VILLAGER: number
    WEREWOLF: number
}
