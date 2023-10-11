// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'boshqaruv paneli',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'bot foydalanuvchilari',
    path: '/dashboard/bot-user',
    icon: icon('ic_user'),
  },
  {
    title: 'administratorlar',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'guruhlar',
    path: '/dashboard/groups',
    icon: icon('ic_cart'),
  },
  {
    title: 'postlar',
    path: '/dashboard/post',
    icon: icon('ic_blog'),
  },
  {
    title: 'sozlamalar',
    path: '/dashboard/settings',
    icon: icon('ic_lock'),
  }
];

export default navConfig;
