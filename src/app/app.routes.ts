import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('../app/gradingSystem/grading-system-login/grading-system-login.component').then(_ => _.GradingSystemLoginComponent)},
  {path: 'courses', loadComponent: () => import('../app/gradingSystem/courses/view-courses/view-courses.component').then(_ => _.ViewCoursesComponent)},
  {path: 'addCourses', loadComponent: () => import('../app/gradingSystem/courses/add-courses/add-courses.component').then(_ => _.AddCoursesComponent)},
  {path: 'students', loadComponent: () => import('../app/gradingSystem/students/view-students/view-students.component').then(_ => _.ViewStudentsComponent)},
  {path: 'addStudents', loadComponent: () => import('../app/gradingSystem/students/add-students/add-students.component').then(_ => _.AddStudentsComponent)},
    {path: 'gradingSystem', loadComponent: () => import('../app/gradingSystem/grading/grading.component').then(_ => _.GradingComponent)},
    {path: '', loadComponent: () => import('../app/gradingSystem/grading-dashboard/grading-dashboard.component').then(_ => _.GradingDashboardComponent)},
  {path: 'results', loadComponent: () => import('../app/gradingSystem/results/results').then(_ => _.Results)},
  {path: 'ACAD/resultChecker', loadComponent: () => import('../app/gradingSystem/result-checker/result-checker').then(_ => _.ResultChecker)},
  {path: 'debug', loadComponent: () => import('../app/gradingSystem/debug/debug').then(_ => _.Debug)},
  {path: 'login', loadComponent: () => import('../app/gradingSystem/grading-system-login/grading-system-login.component').then(_ => _.GradingSystemLoginComponent)},
  {path: 'view-result', loadComponent: () => import('../app/gradingSystem/result-view/result-view').then(_ => _.ResultView)},
  {path: '**', loadComponent: () => import('../app/gradingSystem/invalid-page/invalid-page').then(_ => _.InvalidPage)},



];
