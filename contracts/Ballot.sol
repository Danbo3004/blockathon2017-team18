pragma solidity ^0.4.2;

contract Ballot {
    address chairperson;
    mapping (address => uint) balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
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
        uint id_program = number_programs++;
        Programs[id_program] = Program({
            name: "Chuong trinh 1",
            start: 10,
            end: 20,
            number_actors: 0
        });
        uint actor_id = Programs[id_program].number_actors++;
        Programs[id_program].actors[actor_id] = Actor({
            name: "Manhnd",
            vote_count: 0
        }); 
    }

    modifier onlyChairPerson() {
        require(msg.sender == chairperson);
        _;
    }

    function sendCoin(address to, uint amount) returns (bool) {
        // if(msg.sender == chairperson || balances[chairperson] < amount) {
        //     return false;
        // }
        balances[chairperson] -= amount;
        balances[to] += amount;
        Transfer(msg.sender, to, amount);
        return true;
    } 

    function vote(address from, bytes32 hash_phone, uint id_Program, uint id_actor) returns (bool) {
        //NOTE require exist Program
        //NOTE require exist actor
        Program storage e = Programs[id_Program];
        e.voters[from].hash_phone = hash_phone;
        uint index = ++e.voters[from].number_actor;
        e.voters[from].actors[index] = id_actor;
    }

    function getBalance(address addr) constant returns (uint) {
        return balances[addr];
    }

    function isChair (address addr) returns (bool) {
        return addr == chairperson;
    }

    function getProgram(uint id) public constant returns(bytes32, uint, uint, uint) {
        
    }
}