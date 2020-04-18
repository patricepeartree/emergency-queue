import React from "react";
import styled from "styled-components";
import { Statistic, Icon, SemanticICONS, SemanticCOLORS } from "semantic-ui-react";

interface StatisticProps {
    label: string;
    value: string | number;
    icon: SemanticICONS;
    color: SemanticCOLORS;
}

function AppStatistic(props: StatisticProps) {
    const { label, value, icon, color } = props;

    return (
        <StatisticWrapper>
            <Statistic color={color}>
                <Statistic.Value><Icon name={icon} size="tiny" /> {value}</Statistic.Value>
                <Statistic.Label>{label}</Statistic.Label>
            </Statistic>
        </StatisticWrapper>
    );
}

const StatisticWrapper = styled.div`
    padding: 15px;
    text-align: center;
    
    &:first-child {
        padding-top: 30px;
    }
`;

export default AppStatistic;
