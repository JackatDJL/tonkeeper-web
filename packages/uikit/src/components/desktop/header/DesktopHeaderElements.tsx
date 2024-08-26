import styled from 'styled-components';
import { Skeleton } from '../../shared/Skeleton';
import { Body2Class, Body3, Num2 } from '../../Text';
import { formatFiatCurrency } from '../../../hooks/balance';
import { Network } from '@tonkeeper/core/dist/entries/network';
import { AppRoute, SettingsRoute } from '../../../libs/routes';
import { FC } from 'react';
import BigNumber from 'bignumber.js';
import { useActiveTonNetwork } from '../../../state/wallet';
import { useUserFiat } from '../../../state/fiat';
import { Link } from 'react-router-dom';
import { hexToRGBA } from '../../../libs/css';
import { FlashingDotsIcon } from '../../Icon';

export const desktopHeaderContainerHeight = '69px';

export const DesktopHeaderContainer = styled.div`
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${p => p.theme.backgroundContentAttention};
    background: ${p => p.theme.backgroundContent};

    * {
        user-select: none;
    }
`;

const BalanceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const TestnetBadge = styled(Link)`
    background: ${p => hexToRGBA(p.theme.accentRed, 0.16)};
    color: ${p => p.theme.accentRed};
    padding: 4px 8px;
    border-radius: ${p => p.theme.corner2xSmall};
    border: none;
    text-transform: uppercase;
    margin-left: 10px;
    margin-right: auto;
    text-decoration: none;

    transition: background 0.15s ease-in-out;

    &:hover {
        background: ${p => hexToRGBA(p.theme.accentRed, 0.36)};
    }

    ${Body2Class};
`;

const ContainerRelative = styled.div`
    position: relative;
`;

const PendingEventsContainer = styled(Link)`
    text-decoration: unset;
    background: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 85%;
    left: 0;
    white-space: nowrap;
    display: flex;
    gap: 5px;
    align-items: center;

    color: ${p => p.theme.textSecondary};

    &:hover {
        color: ${p => p.theme.textPrimary};
    }

    transition: 0.1s ease-in-out;
`;

const FlashingDotsIconStyled = styled(FlashingDotsIcon)`
    margin-top: 2px;
`;

export const DesktopHeaderBalance: FC<{
    isLoading: boolean;
    balance: BigNumber | undefined;
    pendingEventsNumber?: number;
}> = ({ isLoading, balance, pendingEventsNumber }) => {
    const network = useActiveTonNetwork();
    const fiat = useUserFiat();

    return (
        <>
            {isLoading ? (
                <Skeleton width="100px" height="36px" />
            ) : (
                <BalanceContainer>
                    <ContainerRelative>
                        <Num2>{formatFiatCurrency(fiat, balance || 0)}</Num2>
                        {!!pendingEventsNumber && (
                            <PendingEventsContainer to={AppRoute.activity}>
                                <Body3>{pendingEventsNumber} pending events</Body3>
                                <FlashingDotsIconStyled radiusPx={3} />
                            </PendingEventsContainer>
                        )}
                    </ContainerRelative>
                </BalanceContainer>
            )}
            {network === Network.TESTNET && (
                <TestnetBadge to={AppRoute.settings + SettingsRoute.dev}>Testnet</TestnetBadge>
            )}
        </>
    );
};
