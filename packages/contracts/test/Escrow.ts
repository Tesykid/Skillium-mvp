import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Escrow', function () {
  it('creates, funds, and releases', async () => {
    const [client, worker] = await ethers.getSigners()
    const Escrow = await ethers.getContractFactory('Escrow')
    const escrow = await Escrow.deploy()

    const amount = ethers.parseEther('1')
    const txCreate = await escrow.connect(client).createJob(await worker.getAddress(), amount)
    const rc = await txCreate.wait()
    const jobId = Number(rc?.logs?.[0]?.args?.[0] || 1)

    await expect(
      escrow.connect(client).fundJob(jobId, { value: amount })
    ).to.changeEtherBalances([client, escrow], [-amount, amount])

    await expect(() => escrow.connect(client).releaseFunds(jobId)).to.changeEtherBalances(
      [escrow, worker],
      [-amount, amount]
    )
  })
})