export interface DataState<T> {
    loading: boolean;
    error: string | null;
    data: T | null;
}