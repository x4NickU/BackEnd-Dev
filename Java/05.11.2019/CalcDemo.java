class EsProvaCalc{
	double media(double a, double b) {
		double mia_media = (a+b)/2;
		System.out.println(mia_media);
		return 0;
	}
}
class CalcDemo{
	public static void main(String[] args){
		EsProvaCalc calcolatrice = new EsProvaCalc();
		calcolatrice.media(3,4);
	}
}