import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'overview',
    canActivate: [AuthGuard],
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
