import Dashboard from '@modules/dashboard/Dashboard';
import { EAppRouter } from './type';
import Workflow from '@modules/dashboard/Workflow';
import Pricing from '@modules/pricing/Pricing';
import Account from '@modules/account/Account';
import ConversionTableReport from '@modules/dashboard/ConversionTableReport';
import ConversionHistory from '@modules/dashboard/ConversionHistory';

export type RouteProps = {
    path: string;
    component: React.FC;
    layout?: React.FC<{ children: React.ReactNode }>;
};

// Public routes
const publicRoutes: RouteProps[] = [
    { path: EAppRouter.root, component: Dashboard },
    { path: EAppRouter.workflow, component: Workflow },
    { path: EAppRouter.pricing, component: Pricing },
    { path: EAppRouter.account, component: Account },
    {
        path: EAppRouter.conversionTableReport,
        component: ConversionTableReport,
    },
    { path: EAppRouter.conversionHistory, component: ConversionHistory },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
