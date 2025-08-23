'use client';

import { Post } from "@madrasah/services/api/types";
import { useQuery } from "~/hooks";

export default function Home() {
  const { data, isLoading, error } = useQuery<Post[]>(api => api.getPosts())
  console.log({data, isLoading, error})

  return <div>Home</div>
}
