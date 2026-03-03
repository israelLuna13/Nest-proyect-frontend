// Route Handler (server-side API endpoint)
// Acts as a proxy between the client and the external backend API.
// It receives the coupon from the client,
// calls the private API using process.env.API_URL,
// and returns the backend response.
// This keeps environment variables secure and avoids CORS issues.
export async function POST(request: Request){
    const coupon = await request.json()
    const url=`${process.env.API_URL}/coupons/apply-coupon`
    
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(coupon)
    })
    
    const response = await req.json()
    return Response.json({...response, status: req.status})
    

}