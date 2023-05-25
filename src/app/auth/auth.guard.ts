import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.getUserDetails();

  return userDetails?.roleId == 1 ? true : checkRoleBasedRouting(userDetails?.roleId,router);
};

export const DoctorGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.getUserDetails();

  return userDetails?.roleId == 2 ? true : checkRoleBasedRouting(userDetails?.roleId,router);
};

export const PatientGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.getUserDetails();

  return userDetails?.roleId == 3 ? true : checkRoleBasedRouting(userDetails?.roleId,router);
};

export const NurseGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.getUserDetails();

  return userDetails?.roleId == 4 ? true : checkRoleBasedRouting(userDetails?.roleId,router);
};

export const ReceptionistGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.getUserDetails();

  return userDetails?.roleId == 5 ? true : checkRoleBasedRouting(userDetails?.roleId,router);
};

export const AuthenticationGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userDetails = authService.getUserDetails();
    if (userDetails?.roleId == 1) {
      return router.parseUrl("admin");
    } else if (userDetails?.roleId == 2) {
      return router.parseUrl("doctor");
    } else if (userDetails?.roleId == 3) {
      return router.parseUrl("patient");
    } else if (userDetails?.roleId == 4) {
      return router.parseUrl("supporting/nurse");
    } else if (userDetails?.roleId == 5) {
      return router.parseUrl("supporting/receptionist");
    }else {
      return router.parseUrl("home1");
    }
  }

  return true;
};

function checkRoleBasedRouting(roleId: number|undefined, router: Router) {
  if (!roleId) {
    return router.parseUrl("home1");
  }

  if (roleId == 1) {
    return router.parseUrl("admin");
  } else if (roleId == 2) {
    return router.parseUrl("doctor");
  } else if (roleId == 3) {
    return router.parseUrl("patient");
  } else if (roleId == 4) {
    return router.parseUrl("supporting/nurse");
  } else if (roleId == 5) {
    return router.parseUrl("supporting/receptionist");
  } else {
    return router.parseUrl("home1");
  }
}
