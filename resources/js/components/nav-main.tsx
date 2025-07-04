import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { isMenuActive } from '@/lib/utils';
import { NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
    return items.map((group) => {
        return (
            <SidebarGroup className="px-2 py-0" key={group.title}>
                <SidebarGroupLabel>
                    {group.title}
                </SidebarGroupLabel>
                <SidebarMenu>
                    {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton isActive={isMenuActive(item.href)} tooltip={{ children: item.title }} asChild>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        );
    });
}
