import { TestBed } from '@angular/core/testing';

import { Auth2InterceptorInterceptor } from './auth2-interceptor.interceptor';

describe('Auth2InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Auth2InterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Auth2InterceptorInterceptor = TestBed.inject(Auth2InterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
