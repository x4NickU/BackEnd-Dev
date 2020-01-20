class Minore {
	int min(int n1, int n2) {
		if(n1 < n2){
			return n1;
		}else{
			return n2;
		}
	}
}

class esercizio2 {
	public static void main(String args[]) {
		Minore init = new Minore();
		int result = init.min(30,15);
		System.out.println(result);
	}
}