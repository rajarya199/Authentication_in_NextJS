import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path=request.nextUrl.pathname

    const isPublicPath=path==='/login' || path==='/signup' || path==='/verifyemail'

    //check if user is auth&login
   const token=  request.cookies.get("token")?.value ||""


   //if user is alredy login then it should not be in login,register,verifyemail page
    //so redirect to home page
   if(isPublicPath && token){
      return NextResponse.redirect(new URL('/', request.url))
   }


   //if not login and not on public path,redirect to login
   if(!isPublicPath && !token){
         return NextResponse.redirect(new URL('/login', request.url))
   }

}

//set where middleware should run

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/(.*)',
    '/verifyemail'
  ]
}