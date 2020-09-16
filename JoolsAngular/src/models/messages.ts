export interface IMessageData {
    id: number,
    group_id: number,
    group_name: string,
}

export interface IMessageRes {
    data: Category[],
    success: boolean,
    message: string,
}


export interface Category {
    id: number,
    category: string,
    category_code: string,
    subcategory_id: number
}



export interface IChatHistory {
    id: number,
    from_user: string,
    to_user: string,
    content: string,
    is_read: string,
    created_at: string,
    to_user_profile_image: string,
    from_user_profile_image: string,
    time_to_ago: string,
}

export interface IMessageGroupChatData {
    name: string,
    task_name: string,
    profile_image: string,
    to_user:number,
    chat_history: IChatHistory[],
}

export interface IMessageGroupChatRes {
    data: IMessageGroupChatData,
    success: boolean,
    message: string,
}

export interface IMessageGroupChatInfoData {
    name: string,
    email: string,
    profile_image: string,
    address: IChatHistory[],
    address2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    review_count: number,
    rating: number,
    attachments: string[],
    slug: string,
}

export interface IResData {
    success: boolean,
    message: string,
}
