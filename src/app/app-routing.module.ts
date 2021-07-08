import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { RegisterPage } from './register/register.page';
import { FirstPage } from './pages/first/first.page';

const routes: Routes = [
    {
    path: '',
    component: FirstPage,
  },
  // {
  //   path: 'register',
  //   component: RegisterPage,
  // },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'editpost/:id',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'edituser/:id',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'profileuser',
    loadChildren: () => import('./profileuser/profileuser.module').then( m => m.ProfileuserPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notievents',
    loadChildren: () => import('./notievents/notievents.module').then( m => m.NotieventsPageModule)
  },
  {
    path: 'notirequest',
    loadChildren: () => import('./notirequest/notirequest.module').then( m => m.NotirequestPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'noti-events',
    loadChildren: () => import('./noti-events/noti-events.module').then( m => m.NotiEventsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'my-event',
    loadChildren: () => import('./event/my-event/my-event.module').then( m => m.MyEventPageModule)
  },
  {
    path: 'joiner-event',
    loadChildren: () => import('./event/joiner-event/joiner-event.module').then( m => m.JoinerEventPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'eventdetail',
    loadChildren: () => import('./event/eventdetail/eventdetail.module').then( m => m.EventdetailPageModule)
  },
  {
    path: 'myrequest',
    loadChildren: () => import('./myrequest/myrequest.module').then( m => m.MyrequestPageModule)
  },
  {
    path: 'first',
    loadChildren: () => import('./pages/first/first.module').then( m => m.FirstPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
