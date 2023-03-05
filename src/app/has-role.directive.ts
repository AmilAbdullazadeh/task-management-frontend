import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective {
  @Input()
  set appHasRole(isAdmin: boolean) {
    if (this.authService.hasRole(isAdmin)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}
}
