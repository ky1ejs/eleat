//
//  ContentView.swift
//  Eleat
//
//  Created by Kieran McHugh on 24/09/2023.
//

import SwiftUI

struct ContentView: View {
    @State var alertIsOpen = false
    
    var body: some View {
        VStack {
            Button("Launch App") {
                alertIsOpen = true
            }
            .padding(20)
            .overlay {
                RoundedRectangle(cornerRadius: 10).stroke(.blue, lineWidth: 2)
            }
        }
        .alert(isPresented:$alertIsOpen) {
            Alert(
                title: Text("Eleat is now launched"),
                message: Text("Congratulations on the launch"),
                dismissButton: .cancel(
                    Text("Let's go")
                )
            )
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
