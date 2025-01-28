import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card} from "@/components/ui/card"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Carrusel() {
    return (
        <div className='flex justify-center'>
            <Card className="w-full max-w-4xl">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="basis-1/3 ml-8 flex justify-center"><img src='https://cdn.pixabay.com/photo/2017/02/25/23/50/animal-2099057_1280.png'></img></CarouselItem>
                        <CarouselItem className="basis-1/3 pl-16 flex justify-center"><img src='https://svgsilh.com/svg/1801287.svg'></img></CarouselItem>
                        <CarouselItem className="basis-1/3 pl-7 ml-8 flex justify-center"><img src='https://www.softwareland.mx/img/softwareland-logo.svg'></img></CarouselItem>
                        <CarouselItem className="basis-1/3 pl-7 ml-8 flex justify-center"><img src='https://www.softwareland.mx/img/softwareland-logo.svg'></img></CarouselItem><CarouselItem className="basis-1/3 pl-7 ml-8 flex justify-center"><img src='https://www.softwareland.mx/img/softwareland-logo.svg'></img></CarouselItem><CarouselItem className="basis-1/3 pl-7 ml-8 flex justify-center"><img src='https://www.softwareland.mx/img/softwareland-logo.svg'></img></CarouselItem>
                    </CarouselContent >
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Card>
        </div>
    )
}
