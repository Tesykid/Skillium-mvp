// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {
    struct Job {
        address client;
        address worker;
        uint256 amount;
        bool funded;
        bool released;
        bool cancelled;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public nextJobId;

    event JobCreated(uint256 indexed jobId, address indexed client, address indexed worker, uint256 amount);
    event JobFunded(uint256 indexed jobId, uint256 amount);
    event FundsReleased(uint256 indexed jobId, address indexed worker, uint256 amount);
    event JobCancelled(uint256 indexed jobId);

    function createJob(address worker, uint256 amount) external returns (uint256 jobId) {
        require(worker != address(0), "worker required");
        require(amount > 0, "amount > 0");
        jobId = ++nextJobId;
        jobs[jobId] = Job({
            client: msg.sender,
            worker: worker,
            amount: amount,
            funded: false,
            released: false,
            cancelled: false
        });
        emit JobCreated(jobId, msg.sender, worker, amount);
    }

    function fundJob(uint256 jobId) external payable {
        Job storage job = jobs[jobId];
        require(job.client != address(0), "job missing");
        require(msg.sender == job.client, "only client");
        require(!job.cancelled, "cancelled");
        require(!job.funded, "already funded");
        require(msg.value == job.amount, "incorrect amount");
        job.funded = true;
        emit JobFunded(jobId, msg.value);
    }

    function releaseFunds(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.client != address(0), "job missing");
        require(msg.sender == job.client, "only client");
        require(job.funded, "not funded");
        require(!job.released, "already released");
        require(!job.cancelled, "cancelled");
        job.released = true;
        (bool ok, ) = job.worker.call{value: job.amount}("");
        require(ok, "transfer failed");
        emit FundsReleased(jobId, job.worker, job.amount);
    }

    function cancelJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.client != address(0), "job missing");
        require(msg.sender == job.client, "only client");
        require(!job.cancelled, "already cancelled");
        require(!job.released, "already released");
        job.cancelled = true;
        if (job.funded) {
            (bool ok, ) = job.client.call{value: job.amount}("");
            require(ok, "refund failed");
        }
        emit JobCancelled(jobId);
    }
}