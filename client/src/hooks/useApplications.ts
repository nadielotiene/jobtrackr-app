import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import type { Application, CreateApplicationInput } from '../types';

const QUERY_KEY = ['applications'];

export const useApplications = () =>
	useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => client.get<Application[]>('/applications').then((r) => r.data),
	});

export const useCreateApplication = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateApplicationInput) =>
			client.post<Application>('/applications', data).then((r) => r.data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY}),
    // invalidateQueries = tells React Query to refetch the list after a change
	})
}

export const useUpdateApplication = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string, data: Partial<CreateApplicationInput> }) =>
			client.put<Application>(`/applications/${id}`, data).then((r) => r.data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	})
}

export const useDeleteApplication = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => client.delete(`/applications/${id}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
	})
}
