const fs = rquire("fs/promises");

async function writeAndRead () {
    await fs.writeFile("abc.txt", "abc") // await을 쓰면 .then을 안써도 됨. 그리고 이건 Async 가 아닌 sync 처럼 작동함.
    const data = await fs.readFile("abc.txt", "utf8")
    return data; // wrapped in a promises 그래서 밑에서 출력 하면 string 으로 출력이 안됨 
}

// someFunction(); // function 안에 저걸 두면 이 function은 위에 function이 끝나길 기다리지 않고 계속 run 할거임.

//-------------------------------------------------
// New synctax

async function main() {
    try {
        const supply = await viewAllSupply("MR")
        console.log(supply);
    
        await addSupply("MR")
    
        const changedSupply = await viewAllSupply("MR")
        console.log(changedSupply);
    
        await deleteSupply("MR", "*");
    } catch(err) {
        console.log(err);
    }
}

main();

//EX for note!
// binary(1200) = 100111 11011000
// Buffer is only able to store 8 bits, 그래서 앞에 100111은 사라짐

// this.data uInt8Array