class SommaDouble {
	public static void main(String args[]) {
		if(args.length != 2) 
			System.out.println("Inserire due numeri! p.s mi raccomando usare il . come divisore");
		else{
			int x = Double.parseDouble(args[0]);
			int y = Double.parseDouble(args[1]);
			System.out.println(x+y);
		}
	}
}