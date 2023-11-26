import jwt from 'jsonwebtoken';

export async function sign(data){
    return jwt.sign(data, 'secret')
}

