pragma solidity ^0.4.2;

contract Ballot {
    address chairperson;
    mapping (address => uint) balances;
    
    struct Voter {
        bytes32 hash_phone;
        uint number_actor;
        mapping(uint => uint) actors;
    }

    struct NSP {
        bytes32 hash_password;
        bytes32 name;
    }

    struct Actor {
        bytes32 name;
        uint vote_count;
    }

    struct Program {
        bytes32 name;
        uint start;
        uint end;
        uint number_actors;
        mapping (uint => Actor) actors;
        mapping(address => Voter) voters;
    }

    uint number_programs;
    mapping(uint => Program) Programs;
    mapping(uint => NSP) nsps;

    function Ballot() {
        chairperson = msg.sender;
        balances[chairperson] = 10000;
    }

    modifier onlyChairPerson() {
        require(msg.sender == chairperson);
        _;
    }

    function sendCoin(address to, uint amount) returns (bool) {
        if(msg.sender == chairperson || balances[chairperson] < amount) {
            return false;
        }
        balances[chairperson] -= amount;
        balances[to] += amount;
        return true;
    } 

    function vote(address from, bytes32 hash_phone, uint id_Program, uint id_actor) returns (bool) {
        //NOTE require exist Program
        //NOTE require exist actor
        Program storage e = Programs[id_Program];
        e.voters[from].hash_phone = hash_phone;
        uint index = e.voters[from].number_actor++;
        e.voters[from].actors[index] = id_actor;
    }

    function getBalance(address addr) returns (uint) {
        return balances[addr];
    }

    function isChair (address addr) returns (bool) {
        return addr == chairperson;
    }
}