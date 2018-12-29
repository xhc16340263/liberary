pragma solidity >=0.4.22 <0.6.0;

//@title Liberary which provides book lending and returning.
contract Liberary {
    //This declares a new complex type which will
    //be used for  variables later.
    //It will represent a single student.
    struct Student {
        uint total; //total is the number of books that student can borrow at most.
        uint count; //count is accumulated by borrowing books.
        bool borrowed; //if true,that student already borrowed
        address delegate; //student delegated to.
        uint borrow; //index of the borrowed book;
        bool returnOntime; //if true,the book he borrowed has been returned on time.
    }
    
    //This is a type for a single book.
    struct Book {
        bytes32 name; //short name (up to 32 bytes)
        bool ordered; //if true,that book already ordered.
    }
    
    address public administrator;
    
    //This declares a state variable that
    //stores a 'Student' struct for each possible address.
    mapping(address => Student) public students;
    
    //This declares a state variable that
    //stores a 'Book' struct for each possible address.
    
    // A dynamically-sized array of `Book` structs.
    Book[] public books;
    
    //Create a new Liberary to provide students with book borrowing.
    constructor(bytes32[] memory bookNames) public{
        
        // For each of the provided book names,
        // create a new book object and add it
        // to the end of the array.
        for(uint i=0; i<bookNames.length; i++) {
             // `Books({...})` creates a temporary
            // Book object and `books.push(...)`
            // appends it to the end of `books`.
            books.push(Book({
                name:bookNames[i],
                ordered: false
            }));
        }
    }
    
    //Lend the book to the student in this Liberary.
    function LendBookToStudent(memory student,address book) public{
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.
        require(
            book[student].ordered==false,
            "This book has already been ordered."
        );
        
        require(
            student.count < student.total,
            "You have exceed the limit of the number of the book you can borrow."
        );
        
        require(
           // student.
        );
        student.count++;
    }
    
    //the student returned the book
    function returnBook(memory student,address book) public{
        //the number of the books the student borrowed decreased; 
        student.count--;
        //the book has not been ordered;
        book.ordered=false;
        //the book is returned on time;
        student.returnOntime=true;
    }
    
    //if the book has not been returned, 
    //the number of books that student can borrow at most will be decreased.
    //if the book has been returned, 
    //the number of books that student can borrow at most will be increased.
    function decreaseTotal(memory student) public{
        if(student.returnOntime==false){
            student.total--;
        }
        if(student.returnOntime==true){
            student.total++;
        }
    }
    
}