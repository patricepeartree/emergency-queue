import React from "react";
import styled from "styled-components";
import { Icon, SemanticICONS, Item } from "semantic-ui-react";

interface DetailsItemProps {
    icon?: SemanticICONS;
    title?: string;
    content?: string[];
    meta?: string;
}

function DetailsItem(props: DetailsItemProps) {
    const { icon, title, content, meta } = props;

    return (
        <Item>
            <Item.Image size="tiny">
                <ItemIcon size="big" name={icon} />
            </Item.Image>

            <Item.Content>
                <Item.Header>{title}</Item.Header>
                {meta && <Item.Meta>{meta}</Item.Meta> }
                {(content || []).map(text => (
                    <Item.Description>{text}</Item.Description>
                ))}
                {/* <Item.Extra>Additional Details</Item.Extra> */}
            </Item.Content>
        </Item>
    );
}

export function DetailsItemGroup(props: any) {
    const { children } = props;
    return (
        <ItemGroup className={props.className}>
            {children}
        </ItemGroup>
    );
}

const ItemGroup = styled(Item.Group)`
    &.ui.items > .item {
        background-color: white;
    }

    &.ui.items>.item>.content {
        padding: 1.5em;
    }
`;

const ItemIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default DetailsItem;
