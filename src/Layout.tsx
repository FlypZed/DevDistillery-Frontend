import * as React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LiquorIcon from '@mui/icons-material/Liquor';
import { AppProvider, type Session, type Router } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { Tooltip, Typography, Stack, MenuList, MenuItem, ListItemText, ListItemIcon, Chip, Avatar, Divider, Box } from '@mui/material';
import {
    Account,
    AccountPreview,
    AccountPopoverFooter,
    SignOutButton,
    AccountPreviewProps,
} from '@toolpad/core/Account';
import {useNavigate} from 'react-router-dom';

type Navigation = Array<{
    kind?: 'header';
    segment?: string;
    title: string;
    icon?: React.ReactNode;
    children?: Navigation;
}>;

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        children: [
            {
                segment: 'tasks',
                title: 'Tasks',
                icon: <ContentPasteIcon />,
            },
        ],
    },
    {
        segment: 'board',
        title: 'Drawing Board',
        icon: <FilterFramesIcon />,
    },
];

export const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}
function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0}>
            <Divider />
            <AccountPreview
                variant={mini ? 'condensed' : 'expanded'}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

const accounts = [
    {
        id: 1,
        name: 'Bharat Kashyap',
        email: 'bharatkashyap@outlook.com',
        image: 'https://avatars.githubusercontent.com/u/19550456',
    },
    {
        id: 2,
        name: 'Bharat MUI',
        email: 'bharat@mui.com',
        color: '#8B4513', // Brown color
    },
];

function SidebarFooterAccountPopover() {
    return (
        <Stack direction="column">
            <Typography variant="body2" mx={2} mt={1}>
                Accounts
            </Typography>
            <MenuList>
                {accounts.map((account) => (
                    <MenuItem
                        key={account.id}
                        component="button"
                        sx={{
                            justifyContent: 'flex-start',
                            width: '100%',
                            columnGap: 2,
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.95rem',
                                    bgcolor: account.color,
                                }}
                                src={account.image ?? ''}
                                alt={account.name ?? ''}
                            >
                                {account.name[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: '100%',
                            }}
                            primary={account.name}
                            secondary={account.email}
                            primaryTypographyProps={{ variant: 'body2' }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                        />
                    </MenuItem>
                ))}
            </MenuList>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>
    );
}

const createPreviewComponent = (mini: boolean) => {
    function PreviewComponent(props: AccountPreviewProps) {
        return <AccountSidebarPreview {...props} mini={mini} />;
    }
    return PreviewComponent;
};

function SidebarFooterAccount({ mini }: SidebarFooterProps) {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    return (
        <Account
            slots={{
                preview: PreviewComponent,
                popoverContent: SidebarFooterAccountPopover,
            }}
            slotProps={{
                popover: {
                    transformOrigin: { horizontal: 'left', vertical: 'bottom' },
                    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                    disableAutoFocus: true,
                    slotProps: {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: (theme) =>
                                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                                mt: 1,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 0,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translate(-50%, -50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    },
                },
            }}
        />
    );
}

const demoSession = {
    user: {
        name: 'Bharat Kashyap',
        email: 'bharatkashyap@outlook.com',
        image: 'https://avatars.githubusercontent.com/u/19550456',
    },
};

export default function DashboardLayoutAccountSidebar() {

    const navigate = useNavigate();

    const router: Router = React.useMemo(() => {
        return {
            pathname: window.location.pathname,
            searchParams: new URLSearchParams(),
            navigate: (url: string | URL) => {
                const path = typeof url === 'string' ? url : url.toString();
                navigate(path);
            },
        };
    }, [navigate]);

    function CustomAppTitle() {
        return (
            <Stack direction="row" alignItems="center" spacing={2}>
                <LiquorIcon fontSize="large" color="primary" />
                <Typography variant="h6">DevDistillery</Typography>
                <Chip size="small" label="BETA" color="info" />
                <Tooltip title="Connected to production">
                    <CheckCircleIcon color="success" fontSize="small" />
                </Tooltip>
            </Stack>
        );
    }

    const [session, setSession] = React.useState<Session | null>(demoSession);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession(demoSession);
            },
            signOut: () => {
                setSession(null);
                navigate('/login');
            },
        };
    }, [navigate]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout
                slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount, appTitle: CustomAppTitle }}
            >
                <DemoPageContent pathname={window.location.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}
