
export interface PaginationDataLink {
    url: string;
    label: string;
    active: boolean;
}

export interface PaginationData<D> {
    current_page: number;
    data: D[];
    first_page_url: string;
    from: null;
    last_page: number;
    last_page_url: string;
    links: PaginationDataLink[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: null;
    total: number;
}
