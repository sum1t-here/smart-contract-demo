import { NeucronSigner } from 'neucron-signer'
import { DefaultProvider, bsv } from 'scrypt-ts'
import { mul } from './src/contracts/mul'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 1

    await signer.login('sales@timechainlabs.io', 'string')
    await mul.loadArtifact()

    const multiplicant = BigInt(3)
    const multiplier = BigInt(2)

    const product = multiplicant * multiplier

    const instance = new mul(product)

    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'smart contract deployed: https://whatsonchain.com/tx/' + deployTx.id
    )

    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock(
        multiplicant,
        multiplier
    ) // Updated to unlock with multiplicand and multiplier
    console.log(
        'contract unlocked successfully: https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
