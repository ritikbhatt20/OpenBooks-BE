import { Controller, Post, Body } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { PublicKey } from '@solana/web3.js';

@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Post('initialize-escrow')
  async initializeEscrow(
    @Body('pricePerDay') pricePerDay: number,
    @Body('depositAmount') depositAmount: number,
    @Body('initializerDepositTokenAccount') initializerDepositTokenAccount: string,
    @Body('initializerReceiveWalletAccount') initializerReceiveWalletAccount: string
  ) {
    return this.solanaService.initializeEscrow(
      pricePerDay,
      depositAmount,
      new PublicKey(initializerDepositTokenAccount),
      new PublicKey(initializerReceiveWalletAccount)
    );
  }

  @Post('request-rent')
  async requestRent(
    @Body('rentalDays') rentalDays: number,
    @Body('taker') taker: string,
    @Body('escrowAccount') escrowAccount: string
  ) {
    return this.solanaService.requestRent(
      rentalDays,
      new PublicKey(taker),
      new PublicKey(escrowAccount)
    );
  }

  @Post('accept-rent')
  async acceptRent(
    @Body('taker') taker: string,
    @Body('takerDepositTokenAccount') takerDepositTokenAccount: string,
    @Body('initializerDepositTokenAccount') initializerDepositTokenAccount: string,
    @Body('pdaAccount') pdaAccount: string,
    @Body('escrowAccount') escrowAccount: string
  ) {
    return this.solanaService.acceptRent(
      new PublicKey(taker),
      new PublicKey(takerDepositTokenAccount),
      new PublicKey(initializerDepositTokenAccount),
      new PublicKey(pdaAccount),
      new PublicKey(escrowAccount)
    );
  }

  @Post('return-book')
  async returnBook(
    @Body('taker') taker: string,
    @Body('initializerReceiveWalletAccount') initializerReceiveWalletAccount: string,
    @Body('takerDepositTokenAccount') takerDepositTokenAccount: string,
    @Body('initializerDepositTokenAccount') initializerDepositTokenAccount: string,
    @Body('pdaAccount') pdaAccount: string,
    @Body('escrowAccount') escrowAccount: string
  ) {
    return this.solanaService.returnBook(
      new PublicKey(taker),
      new PublicKey(initializerReceiveWalletAccount),
      new PublicKey(takerDepositTokenAccount),
      new PublicKey(initializerDepositTokenAccount),
      new PublicKey(pdaAccount),
      new PublicKey(escrowAccount)
    );
  }
}
