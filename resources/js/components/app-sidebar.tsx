import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowUp01, Award, Book, Calendar, FilePen, Grid, PersonStanding, User2, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItemsGroup: NavGroup[] = [
    {
        title: 'Application',
        items: [
            {
                title: 'Tableau de bord',
                href: route('dashboard'),
                icon: Grid,
            },
        ],
    },
    {
        title: 'Gestion',
        items: [
            {
                title: 'Classes',
                icon: ArrowUp01,
                href: route('#level.index'),
            },

            {
                title: 'Année académique',
                icon: Calendar,
                href: route('#year.index'),
            },

            {
                title: 'Cours',
                icon: Book,
                href: route('#course.index'),
            },

            {
                title: 'Élèves',
                icon: PersonStanding,
                href: route('#student.index'),
            },

            {
                title: 'Notes',
                icon: FilePen,
                href: route('#grade.index'),
            },

            {
                title: 'Résultats',
                icon: Award,
                href: route('#result.index'),
            },
        ],
    },

    {
        title: 'Autres',
        items: [
            {
                title: 'Tuteur',
                icon: User2,
                href: route('#guardian.index'),
            },

            {
                title: 'Utilisateurs',
                icon: Users,
                href: '#',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItemsGroup} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
