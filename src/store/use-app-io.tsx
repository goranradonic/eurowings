import {ApiCallResult, fetchApi} from "../hooks/use-fetch";
import {useMemo, useState} from "react";
import {FilterProps} from "../pages/Home/Home";

export type ImGurImageTypePros = "video/mp4" | "image/jpeg" | "image/png"

export type ImGurImagePros = {
    id: string,
    title:string,
    description: string
    link: string
    type: ImGurImageTypePros
}

export type ImGurArrayProps = {
    id: string,
    title:string,
    description: string;
    link: string
    ups:number,
    downs:number,
    score: number,
    type: ImGurImageTypePros
    images: Array<ImGurImagePros>
}

export type ImGurDataProps = {
    data: Array<ImGurArrayProps>
}

export type AppIO = {
    getMembers: (filter:FilterProps) => Promise<ApiCallResult<ImGurDataProps, unknown>>;
}

export function useAppIO() {
    const [pendingIOCount, setPendingIOCount] = useState(0);

    function withPendingIO<T>(fetcher: () => Promise<T>) {
        setPendingIOCount(s => s + 1);
        const promise = fetcher();

        promise.finally(() => {
            setPendingIOCount(s => s - 1);
        });

        return promise;
    }

    const io: AppIO = useMemo(() => {

        const commonHeaders: HeadersInit = {
            Authorization: `Client-ID e5b82cddf3de7d8`,
        };

        const headers = new Headers({...commonHeaders,"Content-Type": "application/json"})
        return {
            getMembers: (filter:FilterProps): Promise<ApiCallResult<ImGurDataProps, unknown>> =>
                withPendingIO(() => {
                    return fetchApi(`/gallery/${filter.section}/${filter.sort}${filter.section === 'top' ? `/${filter.window}` : ''}/0${filter.section === 'user' ? `?showViral=${filter.showViral}` : ''}`, {
                        method: 'GET',
                        headers,
                    })

                }),
        }
    }, [])

    return {io, pendingIO: pendingIOCount};
}