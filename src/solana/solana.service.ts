// src/solana/solana.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, PublicKey, clusterApiUrl, Keypair, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, Idl, BN } from '@project-serum/anchor';
import { readFileSync } from 'fs';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import IDL from "./idl.json";
 // Ensure this path is correc

@Injectable()
export class SolanaService {
  private connection: Connection;
  private provider: AnchorProvider;
  private program: Program;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const wallet = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(readFileSync('path/to/your/wallet/keypair.json', 'utf-8')))
    );

    this.provider = new AnchorProvider(this.connection, wallet, AnchorProvider.defaultOptions());
    this.program = new Program(IDL as Idl, new PublicKey('8yvPtTFYnTzw5GGBaJ6UgFrURzYg1CeFtKgiuA33cAG2'), this.provider);
  }

  async initializeEscrow(pricePerDay: number, depositAmount: number, initializerDepositTokenAccount: PublicKey, initializerReceiveWalletAccount: PublicKey) {
    const [escrowAccount, _] = await PublicKey.findProgramAddress(
      [Buffer.from('escrow')],
      this.program.programId
    );

    return await this.program.methods
      .initializeEscrow(new BN(pricePerDay), new BN(depositAmount))
      .accounts({
        initializer: this.provider.wallet.publicKey,
        initializerDepositTokenAccount,
        initializerReceiveWalletAccount,
        escrowAccount,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  }

  async requestRent(rentalDays: number, taker: PublicKey, escrowAccount: PublicKey) {
    return await this.program.methods
      .requestRent(new BN(rentalDays))
      .accounts({
        taker,
        escrowAccount,
      })
      .rpc();
  }

  async acceptRent(taker: PublicKey, takerDepositTokenAccount: PublicKey, initializerDepositTokenAccount: PublicKey, pdaAccount: PublicKey, escrowAccount: PublicKey) {
    return await this.program.methods
      .acceptRent()
      .accounts({
        initializer: this.provider.wallet.publicKey,
        taker,
        takerDepositTokenAccount,
        initializerDepositTokenAccount,
        escrowAccount,
        pdaAccount,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  }

  async returnBook(taker: PublicKey, initializerReceiveWalletAccount: PublicKey, takerDepositTokenAccount: PublicKey, initializerDepositTokenAccount: PublicKey, pdaAccount: PublicKey, escrowAccount: PublicKey) {
    return await this.program.methods
      .returnBook()
      .accounts({
        taker,
        initializerReceiveWalletAccount,
        takerDepositTokenAccount,
        initializerDepositTokenAccount,
        escrowAccount,
        pdaAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }
}
