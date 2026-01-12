"use client";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
    const trpc = useTRPC();
    const {data, isLoading, isError}= useQuery (trpc.agents.getMany.queryOptions());
    if(isLoading){
        return (<LoadingState title="Loading Agents" description="This may take a few seconds..." />)
    }
    if(isError) {
        return ( <ErrorState title="Faield to load agents" description="Something went wrong" /> )
    }

    return (
        <div>
            {JSON.stringify(data, null,2)}
        </div>
    )
}