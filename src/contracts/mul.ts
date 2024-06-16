import { method, prop, SmartContract, assert } from 'scrypt-ts'

export class mul extends SmartContract {
    @prop()
    product: bigint

    constructor(prod: bigint) {
        super(...arguments)
        this.product = prod
    }

    @method()
    public unlock(multiplicant: bigint, multiplier: bigint) {
        assert(
            multiplicant * multiplier == this.product,
            'incorrect multiplication'
        )
    }
}
