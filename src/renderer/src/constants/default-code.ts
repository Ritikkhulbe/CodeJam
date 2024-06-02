const cpp = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`

const java = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`

const python = `print("Hello World")\n`
const javascript = `console.log("Hello World")\n`
const typescript = `console.log("Hello World")\n`

export { java, python, cpp, javascript, typescript }
