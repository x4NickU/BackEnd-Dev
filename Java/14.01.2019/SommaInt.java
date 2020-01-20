class SommaInt {
	public static void main(String args[]) {
		if(args.length != 2) 
			System.out.println("Inserire due numeri!");
		else{
			int x = Integer.parseInt(args[0]);
			int y = Integer.parseInt(args[1]);
			System.out.println(x+y);
		}
	}
}