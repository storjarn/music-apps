/* Checksum.rex
 *
 * Demonstrates how to calculate a Roland System Exclusive checksum
 * for a "Data Set 1" or "Data Request 1" message. Also demonstrates
 * how to convert the message to binary and output it to a Roland
 * module (using MIDI REXX).
 *
 * The main window has an ENTRY box labeled "Address" into which the
 * user types the 3 or 4 address bytes (each separated by a space).
 * There is also a DROP box next to this ENTRY. It contains the items
 * "Decimal", "Hex", and "Binary". The user can type the address bytes
 * in any one of these formats, and then indicate which one he is using.
 *
 * There is also an ENTRY box labeled "Data", and a COMBO box beside it.
 * This is where the user enters the data byte(s), and indicates which
 * format he is using.
 *
 * There is a "Calculate" button to click upon in order to calculate the
 * Roland checksum based upon what he typed into Address and Data. This
 * checksum is then displayed at the bottom of the window (using a TEXT
 * control).
 *
 * NOTE: If the user wishes to calculate the checksum for a "Data Request
 * 1" message, then he can type the 3 or 4 size (ie, count) bytes in the
 * Data box.
 */

ADDRESS NULL

/* Trap HALT and SYNTAX in any scripts we call which don't
 * trap HALT or SYNTAX themselves.
 */
OPTIONS 'TRAP'

/* Trap SYNTAX/ERROR/HALT, and ask for ERROR raising. Disable
 * ERROR raising for RXMSG(). We'll test for errors in our
 * loop
 */
SIGNAL ON HALT
SIGNAL ON SYNTAX
SIGNAL ON ERROR
CALL RXERR('ERROR|DISPLAY', '~!MSG')


/* ================ Create "Roland Checksum Calculator" Window =============== */
/* Default size and position. WindowID = 'RX' */
Rx = ''

/* Use a group of 2 ENTRY controls to enter the Address and Data bytes */
RxType.1 = 'ENTRY'

/* No special flags */
RxFlags.1 = ''

/* Labels for each entry, and Groupbox. Note: No groupbox */
RxLabel.1 = '&Address:|&Data:|'

/* Variable name where the text "typed into" the entries is stored */
RxVal.1 = 'TEXT'

/* RXINFO not needed */

/* ControlsPerLine, X Position, Y Position, Width */
RxPos.1 = '1 10 10 120'

/* The initial text for the 2 entries (initially blank) */
TEXT.1 = ''
TEXT.2 = ''

/* Use a TEXT Group to label the checksum */
RxType.2 = 'TEXT'

/* No border */
RxFlags.2 = 'NOBORDER'

/* No groupbox */
RxLabel.2 = 'Checksum:|'

/* ControlsPerLine (phrases per line), X Position, Y Position */
RxPos.2 = '1 10 62'

/* Use another TEXT Group to display the checksum */
RxType.3 = 'TEXT'

/* No border */
RxFlags.3 = 'NOBORDER'

/* Text line (initially blank), and no groupbox */
RxLabel.3 = '|'

/* ControlsPerLine (phrases per line), X Position, Y Position, Width, BetweenPhrases. Note
 * we deliberately set WidthOfPhrase non-0 to allow enough width to accomodate
 * a range of text digits
 */
RxPos.3 = '1 90 62 84 0'

/* Use a DROP group for "Decimal", "Hex", or "Binary" selection for address bytes */
RxType.4 = 'DROP'

/* User can't type into the ENTRY, and we want the index returned */
RxFlags.4 = 'NOBORDER|READONLY|INDEX'

/* Labels for each dropbox, and Groupbox. Note: No labels or Groupbox */
RxLabel.4 = '||'

/* Stem variable names to fetch the strings for each dropbox in the group */
RxVal.4 = 'ADDRTYPE | DATATYPE'

/* RXINFO not needed */

/* ControlsPerLine, X Position, Y Position, Width */
RxPos.4 = '1 210 4 90'

/* Items for the address type */
ADDRTYPE.1 = 'Decimal'
ADDRTYPE.2 = 'Hex'
ADDRTYPE.3 = 'Binary'
ADDRTYPE.4 = ''  /* Marks the end of the list */

/* Items for the data type */
DATATYPE.1 = 'Decimal'
DATATYPE.2 = 'Hex'
DATATYPE.3 = 'Binary'
DATATYPE.4 = ''  /* Marks the end of the list */

/* Use a PUSH group for the Calculate button */
RxType.5 = 'PUSH'

/* RESULT so that clicking it returns immediately */
RxFlags.5 = 'RESULT'

/* Label, and no groupbox */
RxLabel.5 = '&Calculate|'

/* No default value for button */
RxVal.5 = ''

/* ControlsPerLine, X Position, Y Position */
RxPos.5 = '-1 210 62'

/* Accelerators */
RxAccel = '1 1 _C_ A | 1 2 _C_ D | 5 1 _C_ C'

/* Specify NOCLOSE (since we'll do the closing ourselves), and
 * RESULT so that we can respond to the ENTER key in order to
 * perform the Checksum calculation. Also set SETVAL so that REXX
 * Dialog updates all of our RXVAL variables every time that we
 * return from RXMSG(). This is not a time critical script so we
 * don't care about the overhead. It saves us from having to do
 * RXQUERY() to grab what the user typed into Address and Data.
 */
CALL RXCREATE('Rx', 5, 'Roland Checksum Calculator', 'NOCLOSE|SETVAL|RESULT', RxAccel)

/* Initialize the Address type to "Hex" and Data type to "Decimal" */
CALL RXSET(, 'VALUE', 1, 4, 1)
CALL RXSET(, 'VALUE', 0, 4, 2)

/* Initially select the "Address" ENTRY */
CALL RXSET(, 'ACTIVE', , 1, 1)

/* Do our window message loop */
DO FOREVER

   /* Because we have only 1 window open, we don't bother to specify a WindowID
    * to RXMSG(). RXMSG() will set RXID and RXSUBID.
    *
    * Also, because we specified SETVAL, REXX Dialog will set the VAL variables
    * for all controls.
    *
    * NOTE: Our window is NOCLOSE. RXMSG() will return if the user clicks the CLOSE
    * box. But the window won't be automatically closed. We'll do the closing
    * ourselves with an explicit call to RXMSG() using an 'END' operation.
    */

   /* Wait on the window. We go to sleep while user manipulates windows,
    * until such time as the user presses ESC or ENTER, or tries to close a window
    * using its CLOSE BOX, or uses a RESULT Group or a Control within some Group
    * that has its REPORT Flag set, or an abort signal. Other things that could
    * cause RXMSG() to return are a window timeout, or if the user pressed a key
    * in a window with its KEYS Flag set, or user resizes a window with its NEWSIZE
    * flag set... but we haven't utilized those features here.
    */
   err = RXMSG()  /* NOTE: No WindowID or Operation means a PROCESS operation on any window */

   /* RXWIND now specifies which window woke us up. (The window is still
    * there because we specified NOCLOSE). RXID and RXSUBID tell us what
    * action caused RXMSG() to return. Handle this action.
    */
   IF err == '' THEN INTERPRET 'CALL' RXWIND || '_'  || RXID || '_' || RXSUBID

   /* Do the next interaction */
END










/* ============= ESC key for "Roland Checksum Calculator" window ============== */
RX__ESC:

   /* Drop down into handling for CLOSE BOX */

/* ============ CLOSE BOX for "Roland Checksum Calculator" window ============= */
RX__END:

   /* Close this window */
   CALL RXMSG(RXWIND, 'END')

   /* Exit our script. We never return to the main loop */
   EXIT










/* ============= ENTER key for "Roland Checksum Calculator" window ============== */
RX_0_ENTER:

   /* ENTER key sets the VAL variables of all Groups, so drop down into
    * the handling of the "Calculate" button.
    */

/* ========= Group 1, Control 1 for "Roland Checksum Calculator" window ========= */
RX_5_1:

   /* This is the "Calculate" button. Note that because we used SETVAL in our
    * window, this RESULT button causes RXMSG() to return with all of our VAL
    * variables set. For example, TEXT.1 contains the address bytes typed into
    * the "Address" box, and TEXT.2 contains the data bytes typed into the "Data"
    * box. ADDRTYPE.0 contains 0, 1, or 2 depending upon whether the user selected
    * "Decimal", "Hex", or "Binary" for the DROP box for the address bytes. And
    * DATATYPE.0 contains the same for the data bytes DROP box.
    */

   /* Start with a checksum of 0 */
   Checksum = 0

   /* Now add up all of the address bytes. We must chop off each byte from our
    * VAL variable for Address. If the bytes are expressed in hex or binary, we must
    * first convert to decimal.
    */
   next = "0"
   string = TEXT.1
   DO WHILE next \= ""

      /* Break off the next byte */
      PARSE VAR string next string

      /* Was there another byte? */
      IF next \= "" THEN DO

         /* If it was expressed in hex or binary, we must convert to decimal */

         /* "Hex"? */
         IF ADDRTYPE.0 == 1 THEN next = X2D(next)

         /* Binary? */
         ELSE IF ADDRTYPE == 2 THEN next = X2D(B2X(next))

         /* Add to sum */
         Checksum = Checksum + next

      END

   END

   /* Now add up all of the data bytes. We deal with them the same way as the
    * address bytes above, and add to the previous sum.
    */
   next = "0"
   string = TEXT.2
   DO WHILE next \= ""

      PARSE VAR string next string

      IF next \= "" THEN DO

         IF DATATYPE.0 == 1 THEN next = X2D(next)

         ELSE IF DATATYPE == 2 THEN next = X2D(B2X(next))

         Checksum = Checksum + next

      END

   END

   /* Now finish our checksum calculation by dividing by 128 and getting the
    * remainder, and then subtracting from 128, and accounting for 128 = 0
    */
   Checksum = 128 - (Checksum // 128)
   IF Checksum = 128 THEN Checksum = 0

   /* Print out the checksum value in hex */
   CALL RXSET(RXWIND, 'VALUE', D2X(Checksum) || " (hex)", 3, 1)

   /* =================================================
    * The following code is commented out, but put here
    * for the sake of showing you how you could stuff
    * those above address and data bytes, and the checksum
    * into a variable and send it off to a MIDI Out port
    * to a Roland module.
    * ================================================= */
   TransmitSysex()

   /* Return to main loop */
   RETURN










/* ======================= TransmitSysex() ==================== */
/* This just demonstrates how you can use the address bytes,
 * data bytes, and checksum in a "Data Set 1" message sent to
 * a Roland module. I'll choose the JV-1010 here, and format
 * the message with the JV-1010 model ID. I'll also use
 * MIDIRXIO to open a MIDI Out port and send the message.
 *
 * NOTE: TEXT.1 must contain the address bytes, and TEXT.2 contains the
 * data bytes (or size bytes if a Data Request 1). ADDRTYPE.0 is 0, 1, or
 * 2 to indicate what format the address bytes are in. DATATYPE.0 is the
 * same for the data bytes. And the Checksum has already been calculated
 * and stored in Checksum, and assumed to be in decimal format.
 */

TransmitSysex:

   /* Our DataSet1 variable is going to be used to create the actual "Data Set
    * 1" message we'll send to MIDI Out usung MIDIRXIO's MidiIoOutLong().
    * Note that each byte must be expressed in decimal. A Sysex begins
    * with F0 hex, so we can specify F0 and put it in a format suitable for
    * MidiIoOutLong using X2D(). (Or we could just express F0 in decimal, namely
    * 240). Next we have the Roland ID number of 41 hex. Next
    * we have the device ID. We'll use the default of 10 hex. Next we have the
    * model number which will be 6A hex for a JV-1010. (You'll substitute the
    * appropriate model ID for your Roland unit, if not a JV-1010). Finally,
    * since this is a Data Set 1 message, we format a command ID of 12 hex. If
    * we were making a Data Request 1 instead, then we would substitute 11 hex.
    * We concatenate these 5 bytes as so: (Either line would be correct, depending
    * upon whether you prefer to work with hex or decimal).
    */
/*   DataSet1 = X2D('F0') || " " || X2D('41') || " " || X2D('10') || " " || X2D('6A') || " " || X2D('12') */
   DataSet1 = '240 65 16 106 18'

   /* Convert each address byte to a format suitable for MidiIoOutLong(), and
    * append it to our DataSet1 variable. If the bytes are expressed in decimal,
    * then we're all set to go. If hex, we use X2D(). And if binary, then we use
    * then B2D().
    */
   IF ADDRTYPE.0 == 0 THEN DataSet1 = DataSet1 || " " || TEXT.1
   ELSE DO
      next = "0"
      string = TEXT.1
      DO WHILE next \= ""

         /* Break off the next byte */
         PARSE VAR string next string

         /* Was there another byte? */
         IF next \= "" THEN DO

            /* Convert it to a format suitable for MidiIoOutLong(), and append to DataSet1 */
            IF ADDRTYPE.0 == 1 THEN DataSet1 = DataSet1 || " " || X2D(next)
            IF ADDRTYPE.0 == 2 THEN DataSet1 = DataSet1 || " " || B2D(next)

         END
      END
   END

   /* Do the same for the data bytes */
   IF DATATYPE.0 == 0 THEN DataSet1 = DataSet1 || " " || TEXT.2
   ELSE DO
      next = "0"
      string = TEXT.2
      DO WHILE next \= ""
         PARSE VAR string next string
         IF next \= "" THEN DO
            IF DATATYPE.0 == 1 THEN DataSet1 = DataSet1 || " " || X2D(next)
            IF DATATYPE.0 == 2 THEN DataSet1 = DataSet1 || " " || B2D(next)
         END
      END
   END

   /* Finally, we append the checksum to DataSet1 along with the final F7 */
   DataSet1 = DataSet1 || " " || Checksum || " 247"

   /* Now send DataSet1 to MIDI Out */

   /* Open MIDI Mapper */
   error = MidiIoOpenPort()
   IF error == "" THEN DO

      /* Send the message */
      error = MidiIoOutLong('DataSet1')
      IF error \== "" THEN RXSAY(error, 'MIDI Out Error')

      /* Close the port */
      DO UNTIL error == ""
         error = MidiIoClosePort()
      END

   END
   ELSE RXSAY(error, 'MIDI Out Error')

   RETURN










/* ====================== Error Handling ====================== */
SYNTAX:
   /* Display error box */
   CALL CONDITION('M')

HALT:
ERROR:
   /* NOTE: CONDITION('D') fetches error message. CONDITION('E') fetches the
    * error number. SIGL is the line number where the error occurred.
    * Rexx Dialog has already displayed a message since we specified DISPLAY
    * option.
    */
   CALL RXMSG(,'END')
   EXIT
