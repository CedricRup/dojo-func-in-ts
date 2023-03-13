interface Address {
    zip: string
    city: string
}

interface Order {
    price: number
    quantity: number
    item: string
}

interface Client {
    id: number
    firstName: string
    lastName: string
    address?: Address
    order?: Order
}

const clientWithoutDiscount: Client = {
    id: 1,
    lastName: 'Söze',
    firstName: 'Keyser',
    address: undefined,
    order:
        {
            price: 100,
            quantity: 1,
            item: 'Gun'
        }
}

const clientWithDiscount: Client = {
    id: 2,
    lastName: 'Kint',
    firstName: 'Roger',
    address: {
        zip: '90001',
        city: 'Los Angeles'

    },
    order:
        {
            price: 5.0,
            quantity: 2,
            item: 'Chewing Gum'
        }
}

const clientWithoutOrder: Client = {
    id: 3,
    lastName: 'Keaton',
    firstName: 'Dean',
    address: {
        zip: '90001',
        city: 'Los Angeles'

    },
}

const clients = [clientWithoutDiscount, clientWithDiscount, clientWithoutOrder]

const calculateDiscount = (client: Client) => {
    if (!client) {
        return undefined
    }
    if (!client.address) {
        return 0
    }
    if (client.address.zip === '90001') {
        return 0.1
    }
    return 0
}

const calculateTotal =
    (id: number) => {
        const client = clients.find((c) => c.id === id)
        if (!client) {
            return undefined
        }
        const name = `${client.firstName} ${client.lastName}`
        const order = client.order
        if (!order) {
            return {
                name,
                total: undefined
            }
        }
        const total = order.price * order.quantity
        return {
            name,
            total
        }
    }

describe('Total', () => {
    it('is undefined if client does not exists', () => {
        expect(calculateTotal(42)).toStrictEqual(undefined)
    })
    it('total is undefined if client has no order', () => {
        expect(calculateTotal(3)).toStrictEqual({name: 'Dean Keaton', total: undefined})
    })
    it('does not have discount if wrong zipCode', () => {
        expect(calculateTotal(1)).toStrictEqual({name: 'Keyser Söze', total: 100})
    })
    // it('has discount if good zipCode', () => {
    //     expect(calculateTotal(2)).toStrictEqual({name: 'Roger Kint', total: 9})
    // })
})
