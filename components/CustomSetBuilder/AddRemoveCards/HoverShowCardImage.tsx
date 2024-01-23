import { ITooltipParams } from 'ag-grid-community';
import { forwardRef, useImperativeHandle } from 'react';
import { Card } from '../../../constants/Card';

const HoverShowCardImage = forwardRef((props: ITooltipParams, ref) => {
    const card: Card = props.data

    useImperativeHandle(ref, () => {
        return {
            getReactContainerClasses() {
                return ['custom-tooltip'];
            },
        };
    });

    return (
        <img src={card.card_images[0].image_url} width={"300"} height={"438"} style={{left: 20, bottom: 100, position: "relative"}} alt={card.name}></img>

    );
})

export default HoverShowCardImage