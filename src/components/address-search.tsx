import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import {
    SearchAddressSuggestion,
    useSearchAddress,
} from '@/api/address/use-search-address';
import { debounce } from '@/utils/debounce';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PopoverContent, Popover } from './ui/popover';
import { Input } from './ui/input';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { useRouter, useSearch } from '@tanstack/react-router';
import { CrossCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRetrieveAddress } from '@/api/address/use-retrive-address';
import { useTranslation } from 'react-i18next';

const DISTANCE_STEPS = ['1', '5', '10', '15', '20', '30', '50', '100'] as const;

interface Props {
    className?: string;
}

export const AddressSearch = ({ className }: Props) => {
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] =
        useState<SearchAddressSuggestion>();
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = useSearchAddress({ search });
    const { data: addressData, isFetching: isFetchingAddress } =
        useRetrieveAddress();

    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const { navigate } = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: Record<string, any> = useSearch({ strict: false });

    useEffect(() => {
        if (!isMounted) return;

        if (selectedValue) {
            navigate({
                search: {
                    ...queryParams,
                    mapboxId: selectedValue.mapbox_id,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        } else {
            const paramsCopy = { ...queryParams, mapboxId: undefined };

            navigate({
                search: paramsCopy,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, queryParams, selectedValue]);

    useEffect(() => {
        if (addressData && !isFetchingAddress) {
            setSelectedValue(addressData.properties);
        }
    }, [addressData, isFetchingAddress]);

    const [onSearch] = debounce(
        (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        300,
    );

    useEffect(() => {
        if (!queryParams.mapboxId) setSelectedValue(undefined);
    }, [queryParams.mapboxId]);

    const setDistance = (distance: string) => {
        navigate({
            search: {
                ...queryParams,
                distance,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
    };

    return (
        <div className={cn('p-4', className)}>
            <div className="flex gap-4 flex-1">
                {selectedValue ? (
                    <div className="w-full relative">
                        <Input
                            autoComplete="off"
                            placeholder={t('Enter address...')}
                            disabled
                            value={selectedValue.name}
                            className="pr-9"
                        />
                        <Button
                            onClick={() => setSelectedValue(undefined)}
                            className="absolute right-0 top-0 rounded-full"
                            size="icon"
                            variant="ghost"
                        >
                            <CrossCircledIcon
                                className="size-5"
                                width={20}
                                height={20}
                            />
                        </Button>
                    </div>
                ) : (
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger
                            className="flex-1"
                            onKeyDown={(e) => {
                                if (e.key !== ' ') return;

                                e.preventDefault();

                                if (inputRef.current?.value == null) return;

                                inputRef.current.value =
                                    inputRef.current.value + ' ';

                                onSearch({
                                    target: { value: inputRef.current.value },
                                } as ChangeEvent<HTMLInputElement>);
                            }}
                        >
                            <div className="w-full relative">
                                <Input
                                    autoComplete="off"
                                    placeholder={t('Enter address...')}
                                    onChange={onSearch}
                                    className="pr-9"
                                    ref={inputRef}
                                />
                                <div className="absolute right-0 top-0 p-2">
                                    <MagnifyingGlassIcon className="size-5" />
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className={cn(
                                'w-[var(--radix-popover-trigger-width)] p-0',
                            )}
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            {search.length < 3 && (
                                <div className="text-center p-2">
                                    {t('Enter at least 3 characters')}
                                </div>
                            )}

                            {search.length > 2 && isLoading && (
                                <div className="flex justify-center p-2">
                                    <Loader2
                                        size={24}
                                        className="animate-spin"
                                    />
                                </div>
                            )}
                            {search.length > 2 &&
                                !isLoading &&
                                (data?.suggestions.length !== 0 ? (
                                    data?.suggestions.map((suggestion) => (
                                        <Button
                                            variant="ghost"
                                            key={suggestion.mapbox_id}
                                            value={suggestion.mapbox_id}
                                            className="w-full h-auto max-w-full rounded-none"
                                            onClick={() => {
                                                setSelectedValue(suggestion);
                                                setSearch('');
                                                setIsOpen(false);
                                            }}
                                        >
                                            <div className="flex items-start flex-col w-[calc(100%-3.5rem)] flex-1">
                                                <div className="truncate w-full text-left">
                                                    {suggestion.name}
                                                </div>
                                                <div className="truncate w-full text-left font-light">
                                                    {suggestion.full_address ??
                                                        suggestion.place_formatted}
                                                </div>
                                            </div>
                                        </Button>
                                    ))
                                ) : (
                                    <div className="text-center p-2">
                                        {t('No results found')}
                                    </div>
                                ))}
                        </PopoverContent>
                    </Popover>
                )}

                <Select
                    onValueChange={setDistance}
                    defaultValue={
                        queryParams.distance ?? `${DISTANCE_STEPS[0]}`
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('Distance')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {DISTANCE_STEPS.map((step) => (
                                <SelectItem key={step} value={`${step}`}>
                                    +{step}km
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
