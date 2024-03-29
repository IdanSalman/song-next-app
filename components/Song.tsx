import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addToCart } from '@/drizzle';
import { getSessionData } from '@/app/cookiesLogic/actions';

async function handleCart(songID: string) {
    const username = JSON.parse(await getSessionData() as string).username
    addToCart(username, songID)
} // TODO Implement me


export function BasicCard({ id, artist, album, name, price }: Song) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {artist}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">
                    {album}
                </Typography>
            </CardContent>
            <Typography marginLeft="20px" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {price}$
            </Typography>
            <CardActions>
                <Button onClick={() => handleCart(id)} size="small">Add to cart</Button>
            </CardActions>
        </Card >
    );
}

export interface SongDbRecord {
    [id: string]: Song;
}

export type Song = {
    id: string;
    name: string;
    album: string;
    artist: string;
    price: number;
};